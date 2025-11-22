<template>
    <div class="w-full h-full flex justify-center text-[#FFC233] px-[130px] overflow-auto">
        <div class="w-full flex flex-col justify-start items-center max-w-[1660px]">
            <div class="flex w-full justify-between items-center mt-6">
                <div class="flex items-center">
                    <div>
                        <img class="w-[118px] h-auto" :src="getImageURL('images/cartoons/gear-calm.png')" alt="">
                    </div>
                    <div class="text-[36px]">
                        แบบทดสอบวัดความรู้เรื่องเฟือง
                    </div>
                </div>
                <div class="flex items-center gap-5">
                    <div class="text-[36px]">
                        เวลาที่เหลือ:
                    </div>
                    <div
                        class="flex items-center justify-center text-[36px] w-[250px] h-20 rounded-nw bg-[#FF0000] text-white font-bold">
                        59 : 59
                    </div>
                    <div>
                        <img class="w-[118px] h-auto" :src="getImageURL('images/cartoons/gear-time.png')" alt="">
                    </div>
                </div>
            </div>

            <div class="w-full flex flex-col items-center justify-start mt-5">
                <!-- Section 1, Question -->
                <div class="w-full flex">
                    <div
                        class="flex items-center justify-center w-[120px] h-[120px] rounded-nw bg-white text-black text-[52px] shadow-md shadow-[#FFC233]">
                        1
                    </div>
                    <div
                        class="flex flex-1 items-center justify-center text-[26px] rounded-nw shadow-sm shadow-[#FFC233]">
                        ข้อใด อธิบาย ได้ถูกต้องเกี่ยวกับเฟืองที่อยู่ตำแหน่งกลาง (B 15)
                        มีชื่อเรียกว่าอะไรและมีหน้าที่อะไร
                        เมื่อมอเตอร์ติดอยู่กับเฟือง (A 40)
                    </div>
                </div>
                <div
                    class="relative w-full flex flex-col shadow shadow-[#FFC233] rounded-nw bg-white text-black text-[24px] py-14 px-20 gap-6">
                    <!-- Section 2, Sub Question 1.1 -->
                    <div class="flex items-center justify-center gap-14 pb-12 border-b border-black">
                        <div class="w-[690px] h-[370px] bg-gray-300 rounded-nw"></div>
                        <div class="flex flex-col w-[763px]">
                            <div>
                                คำถามย่อยที่ 1.1
                            </div>
                            <div class="flex flex-col gap-4 mt-8 text-black">
                                <div
                                    class="w-full h-[100px] flex items-center justify-center rounded-nw bg-[#EFF7F7] hover:bg-[#bdcece] shadow-md shadow-[#00000040 cursor-pointer">
                                    ก. เรียกว่าเฟืองขับ (driver gear) มีหน้าที่ช่วยเพิ่มอัตราทดเฟืองให้สูงขึ้น
                                </div>
                                <div
                                    class="w-full h-[100px] flex items-center justify-center rounded-nw bg-[#EFF7F7] hover:bg-[#bdcece] shadow-md shadow-[#00000040 cursor-pointer">
                                    ข. เรียกว่าเฟืองขับ (driver gear) มีหน้าที่ช่วยเพิ่มความเร็วการหมุนของเฟืองตามได้มาก
                                </div>
                                <div
                                    class="w-full h-[100px] flex items-center justify-center rounded-nw bg-[#EFF7F7] hover:bg-[#bdcece] shadow-md shadow-[#00000040 cursor-pointer">
                                    ค. เรียกว่าเฟืองส่งผ่าน (Idler gear)
                                    มีหน้าที่ช่วยรักษาทิศทางการหมุนของเฟืองขับและเฟืองตามให้คงเดิม
                                </div>
                                <div
                                    class="w-full h-[100px] flex items-center justify-center rounded-nw bg-[#EFF7F7] hover:bg-[#bdcece] shadow-md shadow-[#00000040 cursor-pointer">
                                    ง. เรียกว่าเฟืองส่งผ่าน (Idler gear)
                                    มีหน้าที่ช่วยเปลี่ยนทิศทางการหมุนของเฟืองตามให้มีทิศการหมุนตรงข้ามกับเฟืองขับ
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Section 3, Sub Question 1.2 -->
                    <div class="w-full flex flex-col items-center justify-center pb-12 border-b border-black">
                        <div>
                            คำถามย่อยที่ 1.2 นักเรียนมีความมั่นใจในการตอบ คำถามย่อยที่ 1.1 หรือไม่
                        </div>
                        <div class="flex w-full items-center justify-evenly mt-8 text-black">
                            <div
                                class="w-[260px] h-20 flex items-center justify-center rounded-nw bg-[#EFF7F7] hover:bg-[#bdcece] shadow-md shadow-[#00000040 cursor-pointer">
                                ก. มั่นใจ
                            </div>
                            <div
                                class="w-[260px] h-20 flex items-center justify-center rounded-nw bg-[#EFF7F7] hover:bg-[#bdcece] shadow-md shadow-[#00000040 cursor-pointer">
                                ข. ไม่มั่นใจ
                            </div>
                        </div>
                    </div>

                    <!-- Section 4, Sub Question 1.3 -->
                    <div class="w-full flex flex-col items-center justify-center pb-12 border-b border-black">
                        <div>
                            คำถามย่อยที่ 1.3 จงเลือกข้อความที่อธิบายคำตอบในคำถามย่อยที่ 1.1
                        </div>
                        <div class="flex flex-col gap-4 mt-8 text-black">
                            <div
                                class="w-full h-[100px] flex items-center justify-center rounded-nw bg-[#EFF7F7] hover:bg-[#bdcece] shadow-md shadow-[#00000040 cursor-pointer">
                                ก. เฟือง (A 40) ตามเข็มนาฬิกา / เฟือง (B 15)  ตามเข็มนาฬิกา  /เฟือง (A 30) 
                                ทวนเข็มนาฬิกา
                            </div>
                            <div
                                class="w-full h-[100px] flex items-center justify-center rounded-nw bg-[#EFF7F7] hover:bg-[#bdcece] shadow-md shadow-[#00000040 cursor-pointer">
                                ข. ฟือง (A 40) ตามเข็มนาฬิกา / เฟือง (B 15)  ทวนเข็มนาฬิกา  /
                                เฟือง (A 30)  ตามเข็มนาฬิกา
                            </div>
                            <div
                                class="w-full h-[100px] flex items-center justify-center rounded-nw bg-[#EFF7F7] hover:bg-[#bdcece] shadow-md shadow-[#00000040 cursor-pointer">
                                ค. เฟือง (A 40) ตามเข็มนาฬิกา / เฟือง (B 15)  ตามเข็มนาฬิกา  /
                                เฟือง (A 30)  ตามเข็มนาฬิกา
                            </div>
                            <div
                                class="w-full h-[100px] flex items-center justify-center rounded-nw bg-[#EFF7F7] hover:bg-[#bdcece] shadow-md shadow-[#00000040 cursor-pointer">
                                ง. เฟือง (A 40) ตามเข็มนาฬิกา / เฟือง (B 15)  ทวนเข็มนาฬิกา  /
                                เฟือง (A 30)  ทวนเข็มนาฬิกา
                            </div>
                        </div>
                    </div>

                    <!-- Section 5, Sub Question 1.4 -->
                    <div class="w-full flex flex-col items-center justify-center pb-12">
                        <div>
                            คำถามย่อยที่ 1.4 นักเรียนมีความมั่นใจในการตอบ คำถามย่อยที่ 1.3 หรือไม่
                        </div>
                        <div class="flex w-full items-center justify-evenly mt-8 text-black">
                            <div
                                class="w-[260px] h-20 flex items-center justify-center rounded-nw bg-[#EFF7F7] hover:bg-[#bdcece] shadow-md shadow-[#00000040 cursor-pointer">
                                ก. มั่นใจ
                            </div>
                            <div
                                class="w-[260px] h-20 flex items-center justify-center rounded-nw bg-[#EFF7F7] hover:bg-[#bdcece] shadow-md shadow-[#00000040 cursor-pointer">
                                ข. ไม่มั่นใจ
                            </div>
                        </div>
                    </div>

                    <div class="absolute -bottom-7 flex left-0 w-full justify-evenly">
                        <button @click="next" class="flex w-[300px] h-[80px] text-[26px] font-medium bg-[#9DA7A9] hover:bg-[#BDC3C9] text-black drop-shadow-xl font-medium
            rounded-[15px] items-center justify-center cursor-pointer">
                            ย้อนกลับไป
                        </button>
                        <button @click="next" class="flex w-[300px] h-[80px] text-[26px] font-medium bg-[#FFC233] hover:bg-[#B97530] text-black hover:text-white drop-shadow-xl font-medium
            rounded-[15px] items-center justify-center cursor-pointer">
                            ไปต่อเลย
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
definePageMeta({ middleware: ['auth'] })

const { getImageURL } = useAssetUrl()

</script>

<style lang="scss" scoped></style>