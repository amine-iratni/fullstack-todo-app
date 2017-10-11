'use strict';

import { Controller, Get, Post, Put, Delete, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { MessageCodeError } from '../../lib/error/MessageCodeError';
import { models, sequelize } from '../../models/index';
import { UsersService } from "../users/users.service";

@Controller()
export class TodosController {
    constructor(private usersService: UsersService) {}
    
    @Get('todos')
    public async index (req: Request, res: Response) {
        
        let token = (req.headers.authorization as string).split(' ')[1];
        let user = await this.usersService.getUserFromToken(token);

        if (!user) throw new MessageCodeError('todos:show:missingInformation');

        const todos = await models.Todo.findAll({
            where: { UserId: user.dataValues.id}
        });

        return res.status(HttpStatus.OK).json(todos);
    }

    @Post('todos')
    public async create (req: Request, res: Response) {
        let body = req.body;

        let token = (req.headers.authorization as string).split(' ')[1];
        let user = await this.usersService.getUserFromToken(token); 
        
        if (!user || !body || (body && Object.keys(body).length === 0)) throw new MessageCodeError('todos:create:missingInformation');

        body.UserId = user.dataValues.id;

        var createdTodo = await sequelize.transaction(async t => {
            return await models.Todo.create(body, { 
                transaction: t
             });
        });

        return res.status(HttpStatus.CREATED).json(createdTodo);
    }

    @Get('todos/:id')
    public async show (req: Request, res: Response) {
        const id = req.params.id;
        let token = (req.headers.authorization as string).split(' ')[1];
        let user = await this.usersService.getUserFromToken(token); 

        if (!id) throw new MessageCodeError('todos:show:missingId');
        if (!user) throw new MessageCodeError('todos:show:missingInformation');

        const todo = await models.Todo.findOne({
            where: { id: id, UserId: user.dataValues.id}
        });
        return res.status(HttpStatus.OK).json(todo);
    }

    @Put('todos/:id')
    public async update (req: Request, res: Response) {
        const id = req.params.id;
        const body = req.body;
        if (!id) throw new MessageCodeError('todo:update:missingId');
        if (!body || (body && Object.keys(body).length === 0)) throw new MessageCodeError('todo:update:missingInformation');

        var updatedTodo = await sequelize.transaction(async t => {
            const todo = await models.Todo.findById(id, { transaction: t });
            if (!todo) throw new MessageCodeError('todo:notFound');

            /* Keep only the values which was modified. */
            const newValues = {};
            for (const key of Object.keys(body)) {
                if (todo.getDataValue(key) !== body[key]) newValues[key] = body[key];
            }

            return await todo.update(newValues, { transaction: t });
        });

        return res.status(HttpStatus.OK).json(updatedTodo);
    }

    @Delete('todos/:id')
    public async delete (req: Request, res: Response) {
        const id = req.params.id;
        if (!id) throw new MessageCodeError('todo:delete:missingId');

        await sequelize.transaction(async t => {
            return await models.Todo.destroy({
                where: { id },
                transaction: t
            });
        });

        return res.status(HttpStatus.OK).send();
    }
}
