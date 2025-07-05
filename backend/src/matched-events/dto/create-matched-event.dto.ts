import { IsObject } from 'class-validator';

export class CreateMatchedEventDto {
    @IsObject()
    event_json: object;

    @IsObject()
    rule_json: object;
}