module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    longDescription: {
      type: DataTypes.TEXT
    },
    category: {
      type: DataTypes.ENUM('pos', 'pay', 'ops', 'fleet', 'sign', 'library', 'kampuz', 'dynamics', 'studio'),
      allowNull: false
    },
    features: {
      type: DataTypes.JSON, // Store as JSON array
      defaultValue: []
    },
    benefits: {
      type: DataTypes.JSON, // Store as JSON array
      defaultValue: []
    },
    pricing: {
      type: DataTypes.JSON, // Store entire pricing object as JSON
      defaultValue: {}
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    imageUrl: {
      type: DataTypes.STRING
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    timestamps: true,
    tableName: 'products'
  });

  return Product;
};