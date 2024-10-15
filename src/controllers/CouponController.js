const { Coupon, Product, Op } = require('@models');

const CouponController = {
  async create(req, res) {
    const { code, description, discount_type, discount_value, start_date, end_date, product_id } =
      req.body;
    try {
      const coupon = await Coupon.create({
        code,
        description,
        discount_type,
        discount_value,
        start_date,
        end_date,
        product_id,
      });
      res.status(200).json({ success: true, data: coupon });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getAll(req, res) {
    try {
      const coupons = await Coupon.findAll({
        include: [
          {
            model: Product,
            as: 'CouponProduct',
            attributes: ['id', 'name', 'description'],
          },
        ],
      });
      res.status(200).json({ success: true, data: coupons });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getById(req, res) {
    const { id } = req.params;
    try {
      const coupon = await Coupon.findByPk(id, {
        include: [
          {
            model: Product,
            as: 'CouponProduct',
            attributes: ['id', 'name', 'description'],
          },
        ],
      });
      if (!coupon) return res.status(404).json({ message: 'Coupon not found' });
      res.status(200).json({ success: true, data: coupon });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { description, discount_type, discount_value, start_date, end_date, product_id } =
      req.body;
    try {
      const [updated] = await Coupon.update(
        {
          description,
          discount_type,
          discount_value,
          start_date,
          end_date,
          product_id,
        },
        { where: { id } }
      );
      if (!updated) return res.status(404).json({ message: 'Coupon not found' });
      const updatedCoupon = await Coupon.findByPk(id, {
        include: [
          {
            model: Product,
            as: 'CouponProduct',
            attributes: ['id', 'name', 'description'],
          },
        ],
      });
      res.status(200).json({ success: true, data: updatedCoupon });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Coupon.destroy({
        where: { id },
      });
      if (!deleted) return res.status(404).json({ message: 'Coupon not found' });
      res.status(200).json({ success: true, message: 'Delete successfully' });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getActiveCoupons(req, res) {
    const currentDate = new Date();
    try {
      const coupons = await Coupon.findAll({
        where: {
          start_date: { [Op.lte]: currentDate },
          end_date: { [Op.gte]: currentDate },
          is_active: true,
        },
        include: [
          {
            model: Product,
            as: 'CouponProduct',
            attributes: ['id', 'name', 'description'],
          },
        ],
      });
      res.status(200).json({ success: true, data: coupons });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async checkCoupon(req, res) {
    const { code } = req.params;
    const currentDate = new Date();
    try {
      const coupon = await Coupon.findOne({
        where: {
          code,
          start_date: { [Op.lte]: currentDate },
          end_date: { [Op.gte]: currentDate },
        },
        include: [
          {
            model: Product,
            as: 'CouponProduct',
            attributes: ['id', 'name', 'description'],
          },
        ],
      });
      if (!coupon)
        return res.status(404).json({
          message: 'Coupon is not valid or has expired',
        });
      res.json({
        message: 'Coupon is valid',
        coupon,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },

  async getCouponsByDiscountType(req, res) {
    const { discount_type } = req.params;
    try {
      const coupons = await Coupon.findAll({
        where: { discount_type },
        include: [
          {
            model: Product,
            as: 'CouponProduct',
            attributes: ['id', 'name', 'description'],
          },
        ],
      });
      res.status(200).json({ success: true, data: coupons });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error,
      });
    }
  },
};

module.exports = CouponController;
