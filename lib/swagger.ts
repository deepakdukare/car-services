import { createSwaggerSpec } from 'next-swagger-doc';

export const spec = createSwaggerSpec({
    apiFolder: 'app/api', // define api folder
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Car Service Agency API',
            version: '1.0.0',
            description: 'API documentation for the Car Service Agency application',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
        components: {
            schemas: {
                ServiceItem: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        description: { type: 'string' },
                        price: { type: 'string' },
                        time: { type: 'string' },
                        image: { type: 'string' },
                        categoryId: { type: 'string' },
                    },
                },
                ServiceCategory: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        title: { type: 'string' },
                        shortDescription: { type: 'string' },
                        image: { type: 'string' },
                        highlights: { type: 'string' },
                        ctaText: { type: 'string' },
                    },
                },
                ProductSection: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        title: { type: 'string' },
                        highlight: { type: 'string' },
                        features: { type: 'string' },
                        ctaText: { type: 'string' },
                        phone: { type: 'string' },
                        cardTitle: { type: 'string' },
                        cardDesc: { type: 'string' },
                        cardImage: { type: 'string' },
                    },
                },
                Stats: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        label: { type: 'string' },
                        value: { type: 'integer' },
                        icon: { type: 'string' },
                    },
                },
                ServicePackage: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        title: { type: 'string' },
                        price: { type: 'string' },
                        highlighted: { type: 'boolean' },
                        features: { type: 'string' },
                    },
                },
            },
        },
    },
});
