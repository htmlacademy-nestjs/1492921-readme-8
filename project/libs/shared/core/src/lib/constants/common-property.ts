export const CommonProperty = {
  UserId: {
    Description: {
      description: 'ID of logged user',
      example: '6766fdb720f78014bf83d5a3',
      required: false,
    },
    Validate: {
      Message: 'UserId should be valid MongoId',
    },
  },
  UserIdNotNull: {
    Description: {
      description: 'ID of logged user',
      example: '6766fdb720f78014bf83d5a3',
      required: true,
    },
    Validate: {
      Message: 'UserId should be valid MongoId',
    },
  },
  CreateDate: {
    Description: {
      description: 'Time the record was created',
      example: '2025-02-03 05:47:56.814',
    },
  },
  StartDate: {
    Description: {
      description: 'Start date of the period',
      example: '2025-01-21 05:47',
      required: false,
    },
  },

  TotalPages: {
    Description: {
      description: 'Total pages',
      example: 10,
    },
  },
  TotalItems: {
    Description: {
      description: 'Total items',
      example: 200,
    },
  },
  CurrentPage: {
    Description: {
      description: 'Current page',
      example: 1,
      required: false,
    },
  },
  ItemsPerPage: {
    Description: {
      description: 'Items count per page',
      example: 20,
    },
  },
} as const;
