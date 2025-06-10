import {
  Injectable,
  //   NotFoundException,
  //   BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database/database.service';
import { CreateFreightDTO } from './dto/create-freight.dto';
// import { UpdateFreightDTO } from './dto/update-freight.dto';
// import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';

@Injectable()
export class FreightsService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(createFreightDTO: CreateFreightDTO) {
    const {
      truckNumber,
      forwarder,
      billNumber,
      billDate,
      freightRate,
      currencyId,
      isArrived,
      shipmentId,
      userId,
    } = createFreightDTO;

    try {
      const freight = await this.dbService.freight.create({
        data: {
          truckNumber,
          forwarder,
          billNumber,
          billDate: billDate ? new Date(billDate) : null,
          freightRate,
          currencyId,
          isArrived,
          shipmentId,
          userId,
        },
      });
      return freight;
    } catch (error) {
      console.log(error);
    }
  }
}
