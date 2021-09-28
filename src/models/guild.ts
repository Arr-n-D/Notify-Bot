'use strict';

import {Sequelize, Model} from 'sequelize';

module.exports = (sequelize : Sequelize, DataTypes: any) => {
  class Guild extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models : any) {
      // define association here
    }
  };
  Guild.init(
    {
      guild_id: DataTypes.BIGINT,
      guild_name: DataTypes.STRING(255),
      guild_owner: DataTypes.BIGINT,
      guild_prefix : DataTypes.STRING(2),
    },
    {
      paranoid: true,
      underscored: true,
      sequelize,
      modelName: 'guild',
    }
  );
  return Guild;
};