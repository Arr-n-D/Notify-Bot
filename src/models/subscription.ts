"use strict";

import { Sequelize, Model } from "sequelize";

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }

  Subscription.init(
    {
      sub_keyword: DataTypes.STRING(10),
      sub_member_id: DataTypes.BIGINT,
      sub_active: DataTypes.BOOLEAN,
    },
    {
      paranoid: true,
      underscored: true,
      sequelize,
      modelName: "subscription",
    }
  );
  return Subscription;
};
