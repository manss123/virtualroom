<!-- components/MarzipanoViewer.vue -->
<template>
  <div ref="el" class="viewer-wrap w-full h-full bg-black rounded-2xl overflow-hidden" />
</template>

<script setup lang="ts">
const el = ref<HTMLDivElement | null>(null)
const deg2rad = (d: number) => d * Math.PI / 180

type SceneDef = {
  id: string
  image: string
  init: { yaw: number; pitch: number; fov: number }
  links?: Array<{ yaw: number; pitch: number; to: string; label?: string }>
}

/** 1) ประกาศฉากทั้งหมดไว้เป็นข้อมูล */
const SCENES: SceneDef[] = [
  {
    id: 'room',
    image: '/panos/room.jpg',
    init: { yaw: 0, pitch: 0, fov: deg2rad(90) },
    links: [
      { yaw: deg2rad(-120), pitch: 0, to: 'hall', label: 'ไปโถง' }
    ]
  },
  {
    id: 'hall',
    image: '/panos/room-2.jpg',
    init: { yaw: deg2rad(30), pitch: 0, fov: deg2rad(90) },
    links: [
      { yaw: deg2rad(60), pitch: 0, to: 'room', label: 'กลับห้องเรียน' }
    ]
  }
]

onMounted(async () => {
  const mod = await import('marzipano')
  const M = (mod as any).default ?? mod
  if (!el.value) return

  const limiter = M.util.compose(
    M.RectilinearView.limit.traditional(4096, deg2rad(100)),
    M.RectilinearView.limit.pitch(deg2rad(-60), deg2rad(60)),
    M.RectilinearView.limit.hfov(deg2rad(40), deg2rad(100))
  )

  // 2) viewer เดียว + หลาย scene
  const viewer = new M.Viewer(el.value, { controls: { mouseViewMode: 'drag' } })
  const scenes = new Map<
    string,
    { def: SceneDef; scene: any; view: any; hotspotContainer: any }
  >()

  function buildScene(def: SceneDef) {
    const source = M.ImageUrlSource.fromString(def.image)
    const geometry = new M.EquirectGeometry([{ width: 4000 }])
    const view = new M.RectilinearView(def.init, limiter)
    const scene = viewer.createScene({ source, geometry, view })
    const hotspotContainer = scene.hotspotContainer()

    // 3) วาง hotspot ลิงก์ข้ามฉาก
    def.links?.forEach(link => {
      const wrapper = document.createElement('div')   // <- ตัวนี้จะถูก createHotspot
      wrapper.className = 'mz-hotspot'               // ไม่มี transition ใด ๆ
      wrapper.style.transition = 'none'
      wrapper.style.willChange = 'transform'
      wrapper.style.transform = 'translateZ(0)'

      const btn = document.createElement('button')   // ใส่ hover transition ที่ "ลูก"
      btn.type = 'button'
      btn.className = [
        'inline-flex items-center justify-center w-8 h-8 rounded-full',
        'bg-white/90 text-black ring-2 ring-black/30 shadow',
        'hover:scale-110 transition-transform'       // OK เพราะอยู่บนลูก
      ].join(' ')
      btn.textContent = '•'
      btn.title = link.label ?? 'Go'
      btn.addEventListener('click', () => goToScene(link.to, { preserveView: true, duration: 800 }))
      wrapper.appendChild(btn)

      hotspotContainer.createHotspot(
        wrapper,
        { yaw: link.yaw, pitch: link.pitch }
      )

    })

    scenes.set(def.id, { def, scene, view, hotspotContainer })
  }

  // สร้างทุกฉากจากข้อมูล
  SCENES.forEach(buildScene)

  let current = scenes.get('room')!  // เริ่มที่ห้องใดห้องหนึ่ง
  current.scene.switchTo({ transitionDuration: 0 })

  /** 4) ฟังก์ชันเปลี่ยนฉาก */
  function goToScene(
    id: string,
    opts: { preserveView?: boolean; yaw?: number; pitch?: number; fov?: number; duration?: number } = {}
  ) {
    const next = scenes.get(id)
    if (!next) return
    const dur = opts.duration ?? 800

    // กำหนดมุมกล้องแรกเข้า
    const target = {
      yaw: opts.yaw ?? (opts.preserveView ? current.view.yaw() : next.def.init.yaw),
      pitch: opts.pitch ?? (opts.preserveView ? current.view.pitch() : next.def.init.pitch),
      fov: opts.fov ?? (opts.preserveView ? current.view.fov() : next.def.init.fov)
    }

    // เซ็ตมุมกล้องของฉากใหม่ แล้ว crossfade เข้า
    next.view.setParameters(target)                     // ตั้งค่าทันที
    next.scene.switchTo({ transitionDuration: dur })    // เอฟเฟกต์เปลี่ยนฉาก
    // ถ้าอยากมีกล้องเลื่อนนุ่ม ๆ หลังเข้าแล้ว:
    // next.view.lookTo(target, { transitionDuration: dur })

    current = next
  }

  // กันสกรอลรั่วไป body (เผื่อบางอุปกรณ์)
  const block = (e: Event) => e.preventDefault()
  for (const evt of ['wheel', 'touchmove', 'gesturestart', 'gesturechange']) {
    el.value.addEventListener(evt, block, { passive: false, capture: true })
  }

  // เผยฟังก์ชันออกไปเผื่ออยากเรียกจากพาเรนต์ (ไม่บังคับ)
  // Object.assign((el.value as any), { goToScene })
})
</script>

<style scoped>
.viewer-wrap {
  overscroll-behavior: contain;
  touch-action: none;
  overflow: clip;
}

@supports not (overflow: clip) {
  .viewer-wrap {
    overflow: hidden;
  }
}

.mz-hotspot {
  will-change: transform;
  transform: translateZ(0);
}
</style>
