// const mysql = require('mysql2');
// const Promise = require('bluebird');
const { Sequelize, DataTypes } = require('sequelize');

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

/** @var User holds response data from form one */
const User = db.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    session_id: {
      type: DataTypes.UUID,
    },
  },
  {
    tableName: 'Users',
  }
  );

  /** @var Address holds response data from form two */
  const Address = db.define(
    'Address',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
    address_line_1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address_line_2: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.TEXT('tiny'),
      allowNull: false,
    },
    zip_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    tableName: 'Addresses',
  }
  );

  /** @var Payment holds response data from form three */
const Payment = db.define(
  'Payment',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    card_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isCreditCard: true,
      },
    },
    expiry_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isAfter: DataTypes.NOW,
      },
    },
    cvv: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    billing_zip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    tableName: 'Payments',
  }
  );

  db.authenticate()
    .then(() => console.log(`Connection to database ${process.env.DB_NAME} established!`))
    // .then(() => db.sync({ force: true })) // uncomment to reset db
    .catch((err) => {
      console.log('Error connecting to database');
      console.error(err);
    });

  module.exports = db;
