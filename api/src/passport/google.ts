import GoogleTokenStrategy from 'passport-google-id-token'
import Customer from '../models/Customer'
import { ParsedToken, VerifiedCallback } from '../types'
import { GOOGLE_CLIENT_ID } from '../util/secrets'

console.log('GOOGLE_CLIENT_ID:', GOOGLE_CLIENT_ID)

export default function () {
  return new GoogleTokenStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
    },
    async (
      parsedToken: ParsedToken,
      googleId: string,
      done: VerifiedCallback
    ) => {
      try {
        console.log('googleId:', googleId)
        console.log('parsedToken:', parsedToken)

        let customer: any = await Customer.findOne({
          email: parsedToken.payload.email,
        })
        if (!customer) {
          customer = new Customer({
            email: parsedToken.payload.email,
            isAdmin: false,
          })
          customer.save()
        }

        done(null, customer)
      } catch (error) {
        done(error)
      }
    }
  )
}
