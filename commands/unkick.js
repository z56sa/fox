const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unkick')
        .setDescription('إنشاء رابط دعوة لإرساله للشخص المطرود ليتمكن من العودة')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers), // متاح فقط لمن يملك صلاحية الطرد

    async execute(interaction) {
        try {
            // إنشاء رابط دعوة صالح لمدة 24 ساعة ويستعمل لمرة واحدة فقط
            const invite = await interaction.channel.createInvite({
                maxAge: 86400, // 24 ساعة بالثواني
                maxUses: 1,    // استخدام واحد فقط
                unique: true
            });

            await interaction.reply({
                content: `✉️ | تم إنشاء رابط دعوة جديد لإرساله للشخص المطرود:\n${invite.url}\n*(الرابط صالح لمدة 24 ساعة واستخدام واحد فقط)*`,
                ephemeral: true // الرسالة تظهر فقط للأدمن لحماية الرابط
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '❌ حدث خطأ أثناء محاولة إنشاء رابط الدعوة.', ephemeral: true });
        }
    }
};