const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      offeredSkills: true,
      wantedSkills: true,
      reviewsReceived: { 
        include: { reviewer: { select: { id: true, name: true } } }
      }
    }
  });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

router.post('/:id/offered', async (req, res) => {
  const userId = parseInt(req.params.id);
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Skill name required' });
  let skill = await prisma.skill.findUnique({ where: { name } });
  if (!skill) {
    skill = await prisma.skill.create({ data: { name } });
  }
  await prisma.user.update({
    where: { id: userId },
    data: { offeredSkills: { connect: { id: skill.id } } },
  });
  res.json({ success: true });
});

router.delete('/:id/offered/:skillId', async (req, res) => {
  const userId = parseInt(req.params.id);
  const skillId = parseInt(req.params.skillId);
  await prisma.user.update({
    where: { id: userId },
    data: { offeredSkills: { disconnect: { id: skillId } } },
  });
  res.json({ success: true });
});

router.post('/:id/wanted', async (req, res) => {
  const userId = parseInt(req.params.id);
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Skill name required' });
  let skill = await prisma.skill.findUnique({ where: { name } });
  if (!skill) {
    skill = await prisma.skill.create({ data: { name } });
  }
  await prisma.user.update({
    where: { id: userId },
    data: { wantedSkills: { connect: { id: skill.id } } },
  });
  res.json({ success: true });
});

router.delete('/:id/wanted/:skillId', async (req, res) => {
  const userId = parseInt(req.params.id);
  const skillId = parseInt(req.params.skillId);
  await prisma.user.update({
    where: { id: userId },
    data: { wantedSkills: { disconnect: { id: skillId } } },
  });
  res.json({ success: true });
});

router.post('/:id/reviews', async (req, res) => {
  const revieweeId = parseInt(req.params.id);
  const { reviewerId, rating, comment } = req.body;
  if (!reviewerId || !rating) {
    return res.status(400).json({ error: 'Reviewer and rating required' });
  }
  const review = await prisma.review.create({
    data: { rating, comment, reviewerId, revieweeId }
  });
  res.json(review);
});

module.exports = router;
