import express, { Request, Response } from 'express';
import * as fs from 'fs';

export class Controller {
  static path: string = './newFile.txt';
  static enc: string = 'utf-8';

  static readFile(request: Request, response: Response): void {
    fs.readFile(Controller.path, Controller.enc, (error, data) => {
      if (error) {
        response.status(404).send('File not found');
        return console.error(error.message);
      }

      response.status(200).send(data);
    });
  }

  static createFile(request: Request, response: Response): void {
    if (request.body) {
      let body: string = JSON.stringify(request.body);
      fs.writeFile(Controller.path, (body += '\n'), (err) => {
        if (err) {
          return response.status(500).json({ message: 'ooops' });
        }

        response.status(200).json({ message: 'File is created' });
      });
    } else {
      console.log('error');
      response.status(400).send('Bad request');
    }
  }

  static updateFile(request: Request, response: Response): void {
    let body: string = JSON.stringify(request.body);
    fs.access(Controller.path, fs.constants.R_OK, (err) => {
      if (err) {
        response.status(404).send('File not found');
        return console.error(err.message);
      }

      fs.appendFile(Controller.path, (body += '\n'), (err) => {
        if (err) {
          response.status(500).send('Server error');
          return console.error(err.message);
        }
        response.status(200).json({ message: 'File is updated' });
      });
    });
  }

  static deleteFile(request: Request, response: Response): void {
    fs.unlink(Controller.path, (err) => {
      if (err) {
        response.status(410).send('File does not exist');
        return console.error(err.message);
      }
      response.status(200).send('File is deleted');
    });
  }
}
