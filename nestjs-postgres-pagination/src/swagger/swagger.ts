import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

import { SWAGGER_CONFIG } from './swagger.config';

/**
 * Creates an OpenAPI document for an application, via swagger.
 * @param app the nestjs application
 * @returns the OpenAPI document
 */
export function createDocument(app: INestApplication): OpenAPIObject {
  const { name, url , email} = SWAGGER_CONFIG.contact;
  const builder = new DocumentBuilder()
    .setTitle(SWAGGER_CONFIG.title)
    .setContact(name, url, email)
    .setDescription(SWAGGER_CONFIG.description)
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'authorization')
    .setVersion(SWAGGER_CONFIG.version);
  for (const tag of SWAGGER_CONFIG.tags) {
    builder.addTag(tag);
  }
  const options = builder.build();
  return SwaggerModule.createDocument(app, options);
}
