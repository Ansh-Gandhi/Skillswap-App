const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const skills = await prisma.skill.findMany();
  res.json(skills);
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Skill name required' });
  try {
    const skill = await prisma.skill.create({ data: { name } });
    res.json(skill);
  } catch (e) {
    res.status(400).json({ error: 'Skill already exists or invalid' });
  }
});

module.exports = router;
