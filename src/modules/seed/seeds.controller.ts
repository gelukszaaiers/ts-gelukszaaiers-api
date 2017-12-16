import { Controller, Get, Post, HttpStatus, Inject, Body, Param, Put, Delete, Req } from '@nestjs/common';
import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';

@Controller('seeds')
export class SeedsController {
  constructor(
    @Inject('SeedsServiceToken') private readonly seedsService,
    @Inject('seedSerializer') private readonly seedSerializer,
  ) { }

  @Post()
  async create( @Req() req, @Body() createSeedDto: CreateSeedDto) {
    const { user } = req;
    const seed = await this.seedsService.addSeed(user, createSeedDto);

    return this.seedSerializer.serialize(seed);
  }

  @Get()
  async findAll() {
    const seeds = await this.seedsService.findAll();
    return this.seedSerializer.serialize(seeds);
  }

  @Get(':id')
  async find( @Param() params) {
    try {
      const { id: seedId } = params;
      const seed = await this.seedsService.findOne(seedId);

      return this.seedSerializer.serialize(seed);
    } catch (e) {
      throw e;
    }
  }

  @Put(':id')
  update( @Param() params, @Body() updateSeedDto: UpdateSeedDto) {
    try {
      const { id: seedId } = params;
      const updatedSeed = this.seedsService.update(seedId, updateSeedDto);
      return this.seedSerializer.serialize(updatedSeed);
    } catch (e) {
      throw e;
    }
  }

  @Delete(':id')
  async delete( @Param() params) {
    try {
      const { id: seedId } = params;
      await this.seedsService.removeSeed(seedId);
    } catch (e) {
      throw e;
    }
  }
}