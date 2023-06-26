import { response, Request } from "express";
import User from "../models/user";


export const getUsers = async ( req: Request, res = response ) => {

    const users = await User.findAll();
    
    try {
        res.json({
            msg: 'Ok',
            users
        })
    } catch ( error ) {
        res.status(500).json({
            msg: 'Call to administrator'
        })
    }
}

export const getUser = async( req: Request, res = response ) => {
    
    const { id } = req.params;
    try {
        const user = await User.findByPk( id );

        if ( user ) {
            res.json({
                msg: 'Ok!',
                id
            })
        } else {
            res.status(404).json({
                msg: `Does not exist user with id ${ id }`
            })
        }
    } catch ( error ) {
        res.status(500).json({
            msg: 'Call to administrator'
        })
    }
}

export const postUser = async( req: Request, res = response ) => {
    
    const { body } = req;

    try {

        const existEmail = await User.findOne({
            where: {
                email: body.email
            }
        });

        if ( existEmail ) {
            return res.status( 400 ).json({
                msg: `Alrady exist user with email: ${ body.email }`
            })
        }
        const user = new User( body );
        await user.save();

        res.json({
            msg: 'Ok!',
            user
        })

    } catch ( error ) {
        res.status(500).json({
            msg: 'Call to administrator'
        })
    }
}

export const updateUser = async( req: Request, res = response ) => {

    const { id } = req.params;
    const { body } = req;

    try {
        const user = await User.findByPk( id );

        if ( !user ) {
            res.status(404).json({
                msg: `Does not exist user with id ${ id }`
            })
        } 

        await user.update( body );

        res.json({
            msg: 'Ok!',
            user
        })

    } catch ( error ) {
        res.status(500).json({
            msg: 'Call to administrator'
        })
    }
}

export const deleteUser = async( req: Request, res = response ) => {

    const { id } = req.params;
    
    try {
        const user = await User.findByPk( id );

        if ( !user ) {
            res.status(404).json({
                msg: `Does not exist user with id ${ id }`
            })
        } 

        // physic delete
        // await user.destroy();

        // logic delete
        await user.update({ status: false });
        
        res.json({
            msg: 'Ok!',
            user
        })

    } catch ( error ) {
        res.status(500).json({
            msg: 'Call to administrator'
        })
    }
}