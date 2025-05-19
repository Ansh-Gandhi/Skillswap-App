const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
    include: { offeredSkills: true, wantedSkills: true }
  });
  if (!currentUser) return res.status(404).json({ error: 'User not found' });
  const offeredIds = currentUser.offeredSkills.map(s => s.id);
  const wantedIds  = currentUser.wantedSkills.map(s => s.id);
  const matches = await prisma.user.findMany({
    where: {
      id: { not: userId },
      AND: [
        { offeredSkills: { some: { id: { in: wantedIds } } } },
        { wantedSkills:  { some: { id: { in: offeredIds } } } }
      ]
    },
    include: { offeredSkills: true, wantedSkills: true }
  });
  res.json(matches);
});

module.exports = router;
