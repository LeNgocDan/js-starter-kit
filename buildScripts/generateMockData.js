import { generate, extend } from 'json-schema-faker';
import faker from '@faker-js/faker';
import fs from 'fs';
import chalk from 'chalk';

const schema = {
  "type": "object",
  "properties": {
    "users": {
      "type": "array",
      "minItems": 20,
      "maxItems": 20,
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "unique": true,
            "minimum": 1
          },
          "firstName": {
            "type": "string",
            "faker": "name.firstName"
          },
          "lastName": {
            "type": "string",
            "faker": "name.lastName"
          },
          "email": {
            "type": "string",
            "faker": "internet.email"
          }
        },
        "required": [
          "id",
          "firstName",
          "lastName",
          "email"
        ]
      }
    }
  },
  "required": [
    "users"
  ]
};

extend('faker', () => faker);
const json = JSON.stringify(generate(schema));

fs.writeFile("./src/api/db.json", json, error => {
  if (error) {
    return console.log(chalk.red(error));
  } else {
    return console.log(chalk.green("Mock data generated!"));
  }
})
