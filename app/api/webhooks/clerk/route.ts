import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'


export async function POST(req: NextRequest) {
    try {
        const evt = await verifyWebhook(req)

        // Do something with payload
        // For this guide, log payload to console
        // const { id } = evt.data
        const eventType = evt.type
        // console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
        // console.log('Webhook payload:', evt.data)
        if (eventType === 'user.created') {
            const { id, email_addresses, first_name, last_name } = evt.data
            await prisma.user.create({
                data: {
                    id,
                    email: email_addresses[0]?.email_address,
                    name: `${first_name || ''} ${last_name || ''}`.trim() || 'No name'
                }
            })
            console.log(`User with ID ${id} was created into the database.`)
        }
    } catch (err) {
        console.error('Error creating user in database:', err)
        return new Response('Error creating user in database', { status: 500 })
    }
    return new Response('Webhook received', { status: 200 })
}