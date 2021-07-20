import express, { Request, Response } from 'express';
import * as fs from 'fs';
import { enc, path } from './constants';

export class Controller {
  static readFile(request: Request, response: Response): void {
    fs.readFile(path, enc, (error, data) => {
      if (error) {
        response.status(404).send('File not found');
        return console.error(error.message);
      }

      response.status(200).send(data);
    });
  }

  static createFile(request: Request, response: Response): void {
    if (!request.body) {
      console.log('error');
      response.status(400).send('Bad request');
    } else {
      let body: string = JSON.stringify(request.body);
      fs.writeFile(path, (body += '\n'), (error) => {
        if (error) {
          return response.status(500).json({ message: 'ooops' });
        }

        response.status(200).json({ message: 'File is created' });
      });
    }
  }

  static updateFile(request: Request, response: Response): void {
    let body: string = JSON.stringify(request.body);
    fs.access(path, fs.constants.R_OK, (error) => {
      if (error) {
        response.status(404).send('File not found');
        return console.error(error.message);
      }

      fs.appendFile(path, (body += '\n'), (error) => {
        if (error) {
          response.status(500).send('Server error');
          return console.error(error.message);
        }
        response.status(200).json({ message: 'File is updated' });
      });
    });
  }

  static deleteFile(request: Request, response: Response): void {
    fs.unlink(path, (error) => {
      if (error) {
        response.status(410).send('File does not exist');
        return console.error(error.message);
      }
      response.status(200).send('File is deleted');
    });
  }
}
