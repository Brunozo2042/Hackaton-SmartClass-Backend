import { Options } from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'SmartClass API',
    version: '1.0.0',
    description: 'Documentação da API do SmartClass',
  },
  servers: [
    {
      url: `${process.env.BASE_URL}:${process.env.PORT}`,
      description: 'Servidor local',
    },
  ],
  components: {
    schemas: {
      Aluno: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'ID único do aluno',
          },
          nome: {
            type: 'string',
            description: 'Nome do aluno',
          },
          email: {
            type: 'string',
            description: 'E-mail do aluno',
          },
          ra: {
            type: 'string',
            description: 'Registro acadêmico do aluno',
          },
          turma_id: {
            type: 'string',
            description: 'ID da turma do aluno',
          },
        },
        required: ['nome', 'email', 'ra', 'turma_id'],
      },
      Turma: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'ID único da turma',
          },
          nome: {
            type: 'string',
            description: 'Nome da turma',
          },
        },
        required: ['nome'],
      },
      Evento: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'ID único do evento',
          },
          titulo: {
            type: 'string',
            description: 'Título do evento',
          },
          descricao: {
            type: 'string',
            description: 'Descrição do evento',
          },
          data: {
            type: 'string',
            format: 'date-time',
            description: 'Data do evento',
          },
        },
        required: ['titulo', 'descricao', 'data'],
      },
      Materia: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'ID único da matéria',
          },
          nome: {
            type: 'string',
            description: 'Nome da matéria',
          },
        },
        required: ['nome'],
      },
      Professor: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'ID único do professor',
          },
          nome: {
            type: 'string',
            description: 'Nome do professor',
          },
          email: {
            type: 'string',
            description: 'E-mail do professor',
          },
        },
        required: ['nome', 'email'],
      },
      Conteudo: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'ID único do conteúdo',
          },
          titulo: {
            type: 'string',
            description: 'Título do conteúdo',
          },
          descricao: {
            type: 'string',
            description: 'Descrição do conteúdo',
          },
          materia_id: {
            type: 'string',
            description: 'ID da matéria associada ao conteúdo',
          },
        },
        required: ['titulo', 'descricao', 'materia_id'],
      },
    },
  },
};

const swaggerOptions: Options = {
  swaggerDefinition,
  apis: ['./src/auth/*.ts', './src/routes/*.ts'], // Caminho para os arquivos com comentários Swagger
};

export default swaggerOptions;
