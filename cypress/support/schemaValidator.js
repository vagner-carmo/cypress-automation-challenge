import Ajv from 'ajv'

const ajv = new Ajv({
    allErrors: true
})

export const validateSchema = (schema, body) => {

    const validate = ajv.compile(schema)

    const valid = validate(body)

    Cypress.log({
        name: 'Schema',
        message: 'Schema validation'
    })

    if (!valid) {

        throw new Error(
            `Schema validation failed\n\n${JSON.stringify(validate.errors, null, 2)}`
        )

    }

}