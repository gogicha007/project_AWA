import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';

@Injectable()
export class LoggingService {
  private logLevel: string;
  private logFilePath: string;
  private maxFileSizeKB: number;

  constructor() {
    this.logLevel = process.env.LOG_LEVEL || 'info';
    this.logFilePath = path.resolve('logs', 'application.log');
    this.maxFileSizeKB = parseInt(
      process.env.LOG_FILE_MAX_SIZE_KB || '1024',
      10,
    );

    if (!fs.existsSync('logs')) {
      fs.mkdirSync('logs');
    }
  }

  private shouldLog(level: string): boolean {
    const levels = ['error', 'warn', 'info', 'debug'];
    return levels.indexOf(level) <= levels.indexOf(this.logLevel);
  }

  private rotateLogFile() {
    const stats = fs.statSync(this.logFilePath);
    if (stats.size / 1024 > this.maxFileSizeKB) {
      const rotatedFile = `${this.logFilePath}.${Date.now()}`;
      fs.renameSync(this.logFilePath, rotatedFile);
    }
  }

  private writeLog(level: string, message: string) {
    const logMessage = `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}\n`;
    fs.appendFileSync(this.logFilePath, logMessage);
    this.rotateLogFile();
  }

  log(level: string, message: string) {
    if (this.shouldLog(level)) {
      this.writeLog(level, message);
    }
  }

  error(message: string, trace?: string) {
    this.log('error', `${message}${trace ? `\nTrace: ${trace}` : ''}`);
  }

  warn(message: string) {
    this.log('warn', message);
  }

  info(message: string) {
    this.log('info', message);
  }

  debug(message: string) {
    this.log('debug', message);
  }
}
