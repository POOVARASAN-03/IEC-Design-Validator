import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CableDesignDto {

  @IsString()
  @IsNotEmpty()
  standard: string;

  @IsString()
  @IsNotEmpty()
  voltage: string;

  @IsString()
  @IsNotEmpty()
  conductor_material: string;

  @IsString()
  @IsNotEmpty()
  conductor_class: string;

  @IsNumber()
  csa: number; // Cross Sectional Area (mm²)

  @IsString()
  @IsNotEmpty()
  insulation_material: string;

  @IsNumber()
  insulation_thickness: number; // mm
}
