import 'multer';
import FormData from 'form-data';

export function dtoToFormData<T>(formData: FormData, dto: T): void {
  for (const [key, value] of Object.entries(dto)) {
    formData.append(key, value);
  }
}

export function multerFileToFormData(
  formData: FormData,
  file: Express.Multer.File,
  name: string
): void {
  const filename = Buffer.from(file.originalname, 'latin1').toString('utf8');
  formData.append(name, file.buffer, { filename });
}
