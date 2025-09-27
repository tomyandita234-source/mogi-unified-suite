module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING
    },
    images_alt: {
      type: DataTypes.STRING,
      defaultValue: 'MogiApp Blog Image'
    },
    images_source: {
      type: DataTypes.STRING,
      defaultValue: 'Morfogenesis Teknologi Indonesia Creative Team'
    },
    createdBy: {
      type: DataTypes.STRING,
      defaultValue: 'Admin'
    },
    source: {
      type: DataTypes.STRING,
      defaultValue: 'Morfogenesis Teknologi Indonesia'
    },
    isShow: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: true,
    tableName: 'blogs'
  });

  return Blog;
};