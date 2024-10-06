exports.authorizeRole = (roles) => (req, res, next) => {
	const userRole = req.user.Role.roleName;
	console.log('User role:', userRole);

	if (roles.includes(userRole)) {
		return next();
	}
	return res.status(403).json({ error: 'Forbidden' });
};
