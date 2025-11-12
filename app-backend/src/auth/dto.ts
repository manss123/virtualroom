import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsString() firstName!: string
    @IsString() lastName!: string
    @IsString() sex!: string
    @IsNumber() age!: number
    @IsString() school!: string
    @IsString() grade!: string
    
    @IsEmail() email!: string
    @MinLength(6) password!: string
}

export class LoginDto {
    @IsEmail() email!: string
    @IsNotEmpty() password!: string
}
