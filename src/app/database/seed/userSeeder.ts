import { PrismaClient } from "@prisma/client";
import { HashPassword } from "../../lib/hash";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Starting user seed...");

    // Upsert roles (user & admin)
    const roles = [
        { id: 1, nama_role: "user", deskripsi: "Role untuk user biasa" },
        { id: 2, nama_role: "admin", deskripsi: "Role untuk admin" }
    ];

    for (const role of roles) {
        await prisma.role.upsert({
            where: { id: role.id },
            update: {
                nama_role: role.nama_role,
                deskripsi: role.deskripsi,
                updatedAt: new Date()
            },
            create: {
                id: role.id,
                nama_role: role.nama_role,
                deskripsi: role.deskripsi,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });
    }

    // 5 users: 3 user, 2 admin
    const users = [
        {
            uniqueId: uuidv4(),
            email: "user1@example.com",
            nama: "User Satu",
            username: "user1",
            password: "userpass1",
            roleId: 1,
        },
        {
            uniqueId: uuidv4(),
            email: "user2@example.com",
            nama: "User Dua",
            username: "user2",
            password: "userpass2",
            roleId: 1,
        },
        {
            uniqueId: uuidv4(),
            email: "user3@example.com",
            nama: "User Tiga",
            username: "user3",
            password: "userpass3",
            roleId: 1,
        },
        {
            uniqueId: uuidv4(),
            email: "admin1@example.com",
            nama: "Admin Satu",
            username: "admin1",
            password: "adminpass1",
            roleId: 2,
        },
        {
            uniqueId: uuidv4(),
            email: "admin2@example.com",
            nama: "Admin Dua",
            username: "admin2",
            password: "adminpass2",
            roleId: 2,
        },
    ];

    for (const userData of users) {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: userData.email },
                    { uniqueId: userData.uniqueId }
                ]
            }
        });

        if (!existingUser) {
            const hashedPassword = await HashPassword(userData.password);
            await prisma.user.create({
                data: {
                    ...userData,
                    password: hashedPassword,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            });
            console.log(`✅ Created user: ${userData.nama}`);
        } else {
            console.log(`⏭️  User already exists: ${userData.nama}`);
        }
    }

    console.log("✅ User seed completed!");
}

main()
    .catch((e) => {
        console.error("❌ User seed failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
