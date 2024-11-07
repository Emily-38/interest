import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';
const prisma = new PrismaClient();

async function main() {
    
    const userRole = await prisma.role.create({
        data: {
        name: 'User'
        },
    });
    const adminRole = await prisma.role.create({
        data: {
        name: 'Admin'
        },
    });

    const confidentialityPrivate = await prisma.confidentiality.create({
        data: {
            name: 'Privée'
        },
    });
    const confidentialityPublic = await prisma.confidentiality.create({
        data: {
            name: 'Public'
        },
    });

    const interest1 = await prisma.interest.create({
        data: {
            name: 'Animaux'
        },
    });
    const interest2 = await prisma.interest.create({
        data: {
            name: 'Sport'
        },
    });
    const interest3 = await prisma.interest.create({
        data: {
            name: 'Voiture'
        },
    });
    const interest4 = await prisma.interest.create({
        data: {
            name: 'Jeux video'
        },
    });
    const interest5 = await prisma.interest.create({
        data: {
            name: 'Art'
        },
    });
    const interest6 = await prisma.interest.create({
        data: {
            name: 'Activité manuelle'
        },
    });
    const interest7 = await prisma.interest.create({
        data: {
            name: 'Voyage'
        },
    });
    const interest8 = await prisma.interest.create({
        data: {
            name: 'Mangas'
        },
    });
    const interest9 = await prisma.interest.create({
        data: {
            name: 'Musique'
        },
    });
    const interest10 = await prisma.interest.create({
        data: {
            name: 'Cuisine'
        },
    });
	
    const adminPassword = await argon.hash('Admin38450*');
    const admin = await prisma.user.create({
        data: {
            email: 'martorana.emily38@gmail.com',
            age: 27,
            gender: 'Femme',
            pseudo: 'Admin',
            password: adminPassword,
            isActive: true,
            confidentialityId: confidentialityPublic.id,
            roleId: adminRole.id,
        },
    });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });