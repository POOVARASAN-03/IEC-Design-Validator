export class ValidationResultDto {
  field: string;
  provided: string;          
  status: 'PASS' | 'FAIL';
  expected: string;       
  comment: string;      
}
