import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserDto {
    @ApiProperty({
        required: false
    })
    name: string | undefined;

    @ApiProperty({
        required: false
    })
    phone: string | undefined;

    @ApiProperty({
        required: false
    })
    email: string | undefined;

    @ApiProperty({
        required: false
    })

    password: string;
}