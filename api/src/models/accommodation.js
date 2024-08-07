module.exports = function (sequelize, DataTypes) {
  const Accommodation = sequelize.define('Accommodation', // Define que va a haber un modelo
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      signatura: {
        type: DataTypes.STRING,
        allowNull: true
      },
      denominaci_comercial: {
        type: DataTypes.STRING,
        allowNull: true
      },
      grup: {
        type: DataTypes.STRING,
        allowNull: true
      },
      subgrup: {
        type: DataTypes.STRING,
        allowNull: true
      },
      inici_d_activitat: {
        type: DataTypes.DATE,
        allowNull: true
      },
      estat: {
        type: DataTypes.STRING,
        allowNull: true
      },
      municipi: {
        type: DataTypes.STRING,
        allowNull: true
      },
      localitat: {
        type: DataTypes.STRING,
        allowNull: true
      },
      direcci: {
        type: DataTypes.STRING,
        allowNull: true
      },
      utm_x: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      utm_y: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      places: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      unitats: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      explotador_s: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      latitude: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    }, {
      sequelize,
      tableName: 'accommodations',
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'id' }
          ]
        }
      ]
    }
  )

  return Accommodation
}
