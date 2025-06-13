import { Sequelize, DataTypes, Model } from 'sequelize';
import { getSequelizeInstance } from '@expressConfig/database';
import { ProductAttributes, ProductPayload } from "@expressModels/products/products";


class Products extends Model<ProductAttributes, ProductPayload>
  implements ProductAttributes {
    public id_products!: number;
    public name!: string;
    public description!: string;
    public price!: number;
    public image_url?: string;
    public created_at?: Date;
    public updated_at?: Date;
  }

Products.init(
  {
    id_products: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize: getSequelizeInstance(),
    modelName: 'Products',
    tableName: 'products',
    timestamps: false,
  }
);

export default Products;
