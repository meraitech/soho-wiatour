export function whatsappApiLink({ phoneNumber = "62881082770459", text }: { phoneNumber?: string, text: string }): string {
    const res = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${text}`
    return res
}
