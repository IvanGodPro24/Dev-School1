import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { EntityNotFoundException } from './NotFoundException';

@Injectable()
export class EntityExistsValidationPipe implements PipeTransform<number> {
    constructor(private readonly entityName: string) {}

    transform(value: number, metadata: ArgumentMetadata) {
        if (isNaN(value)) {
            throw new EntityNotFoundException(this.entityName, value);
        }
        return value;
    }
}
