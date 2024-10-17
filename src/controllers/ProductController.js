const { Product, User, Category, Review, Op, sequelize } = require('@models');

const ProductController = {
  async create(req, res) {
    const { sales_center_id, category_id, name, description, price, stock_quantity, sku, images } =
      req.body;
    try {
      const product = await Product.create({
        sales_center_id,
        category_id,
        name,
        description,
        price,
        stock_quantity,
        sku,
        images,
      });
      res.status(201).json({ success: true, data: product });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getAll(req, res) {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: Category,
            as: 'Category',
            attributes: ['id', 'name'],
          },
          {
            model: Review,
            as: 'ProductReviews',
            attributes: ['id', 'rating', 'comment', 'createdAt'],
            required: false,
          },
          {
            model: User,
            as: 'SalesCenter',
            attributes: ['id', 'full_name', 'business_name'],
          },
        ],
      });
      res.status(201).json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id, {
        include: [
          {
            model: Category,
            as: 'Category',
            attributes: ['id', 'name'],
          },
          {
            model: Review,
            as: 'ProductReviews',
            attributes: ['id', 'rating', 'comment', 'createdAt'],
            required: false,
          },
          {
            model: User,
            as: 'SalesCenter',
            attributes: ['id', 'full_name', 'business_name'],
          },
        ],
      });

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(201).json({ success: true, data: product });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getPaginatedAndSelectedProducts(req, res) {
    const { limit, skip, select } = req.query;

    const limitValue = parseInt(limit) || 10;
    const skipValue = parseInt(skip) || 0;

    let selectedFields = null;
    let includeReviews = true;

    if (select) {
      const userSelectedFields = select.split(',');
      selectedFields = ['id', ...userSelectedFields];

      includeReviews = false;
    }

    try {
      const options = {
        limit: limitValue,
        where: {
          id: {
            [Op.gte]: skipValue,
          },
        },
        attributes: selectedFields ? selectedFields : undefined,
      };

      if (includeReviews) {
        options.include = [
          {
            model: Category,
            as: 'Category',
            attributes: ['id', 'name', 'createdAt'],
          },
          {
            model: Review,
            as: 'ProductReviews',
            attributes: ['id', 'rating', 'comment', 'createdAt'],
          },
          {
            model: User,
            as: 'SalesCenter',
            attributes: ['id', 'full_name', 'business_name'],
          },
        ];
      }

      const products = await Product.findAll(options);

      if (products.length === 0) {
        return res.status(200).json({
          message: 'No products found',
          products,
        });
      }

      res.status(200).json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getPaginatedProducts(req, res) {
    const { limit, page } = req.query;
    const limitValue = parseInt(limit) || 10;
    const pageValue = parseInt(page) || 1;

    try {
      const options = {
        limit: limitValue,
        offset: (pageValue - 1) * limitValue,
        where: {},
      };

      options.include = [
        {
          model: Category,
          as: 'Category',
          attributes: ['id', 'name'],
        },
        {
          model: Review,
          as: 'ProductReviews',
          attributes: ['id', 'rating', 'comment', 'createdAt'],
        },
        {
          model: User,
          as: 'SalesCenter',
          attributes: ['id', 'full_name', 'business_name'],
        },
      ];

      const { rows: products, count: totalItems } = await Product.findAndCountAll(options);

      if (!products.length) {
        return res.status(200).json({
          message: 'No products found',
          products,
        });
      }

      // Send paginated response with total count
      res.status(200).json({
        success: true,
        data: products,
        pagination: {
          totalItems,
          totalPages: Math.ceil(totalItems / limitValue),
          currentPage: pageValue,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async search(req, res) {
    const { name } = req.query;
    try {
      const whereClause = {};
      if (name) {
        whereClause.name = {
          [Op.like]: `%${name}%`,
        };
      }
      const products = await Product.findAll({
        where: whereClause,
        include: [
          {
            model: User,
            as: 'SalesCenter',
            attributes: ['id', 'full_name', 'business_name'],
          },
          {
            model: Category,
            as: 'Category',
            attributes: ['id', 'name'],
          },
        ],
      });
      res.status(201).json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getActiveProducts(req, res) {
    try {
      const products = await Product.findAll({
        where: { is_active: true },
      });
      res.status(201).json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getSortedProducts(req, res) {
    const { sort } = req.query;
    try {
      const products = await Product.findAll({
        order: [['price', sort === 'desc' ? 'DESC' : 'ASC']],
        include: [
          {
            model: User,
            as: 'SalesCenter',
            attributes: ['id', 'full_name', 'business_name'],
          },
        ],
      });
      res.status(201).json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getProductsWithSeller(req, res) {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: User,
            as: 'SalesCenter',
            attributes: ['id', 'full_name', 'business_name'],
          },
        ],
      });
      res.status(201).json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getProductsWithCategory(req, res) {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: Category,
            as: 'Category',
            attributes: ['id', 'name'],
          },
        ],
      });
      res.status(201).json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getProductsWithReviews(req, res) {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: Review,
            as: 'ProductReviews',
            attributes: ['id', 'rating', 'comment', 'createdAt'],
            required: false, // Cho phép sản phẩm không có đánh giá cũng sẽ được trả về
          },
        ],
      });
      res.status(201).json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async filterProducts(req, res) {
    const { category_id, min_price, max_price, is_active } = req.query;
    try {
      const whereClause = {};
      if (category_id) {
        whereClause.category_id = category_id;
      }
      if (min_price) {
        whereClause.price = { [Op.gte]: min_price };
      }
      if (max_price) {
        whereClause.price = { [Op.lte]: max_price };
      }
      if (is_active !== undefined) {
        whereClause.is_active = is_active === 'true';
      }

      const products = await Product.findAll({
        where: whereClause,
        include: [
          {
            model: User,
            as: 'SalesCenter',
            attributes: ['id', 'full_name', 'business_name'],
          },
          {
            model: Category,
            as: 'Category',
            attributes: ['id', 'name'],
          },
        ],
      });
      res.status(201).json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getTopRatedProducts(req, res) {
    try {
      const topRatedProducts = await Product.findAll({
        attributes: {
          include: [
            [sequelize.fn('AVG', sequelize.col('ProductReviews.rating')), 'avgRating']
          ]
        },
        include: [
          {
            model: Review,
            as: 'ProductReviews',
            attributes: [],
          }
        ],
        group: ['Product.id'],
        order: [[sequelize.literal('avgRating'), 'DESC']],
        limit: 10,
        subQuery: false,
      });

      res.status(200).json({ success: true, data: topRatedProducts });
    } catch (error) {
      console.error('Error fetching top-rated products:', error);
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  }


};

module.exports = ProductController;
