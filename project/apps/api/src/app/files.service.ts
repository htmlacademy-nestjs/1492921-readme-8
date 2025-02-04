import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  private readonly filePath = path.resolve(
    __dirname,
    'notify-post-updates-last-date.txt'
  );

  // Чтение даты из файла
  readDate(): string {
    if (fs.existsSync(this.filePath)) {
      const dateString = fs.readFileSync(this.filePath, 'utf-8').trim();
      return new Date(dateString).toISOString();
    }
    return null;
  }

  // Запись текущей даты в файл
  writeCurrentDate(): void {
    const currentDate = new Date().toISOString();
    fs.writeFileSync(this.filePath, currentDate, 'utf-8');
  }
}
