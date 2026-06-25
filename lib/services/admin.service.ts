import prisma from "../prisma"

export const getDashboardStats = async () => {

  const leads = await prisma.lead.findMany();
  return {

  }
}

export const getAllPostsAdmin = async () => {
  return await prisma.post.findMany();
}

export const getAllReviews = async () => {
  return await prisma.review.findMany();
}

export const getAllLeads = async () => {
  return await prisma.lead.findMany();
}

export const getRecentLeads = async () => {
  return await prisma.lead.findMany({
    where: {
      createdAt: {
        gt: new Date((new Date().getTime() - 1))
      }
    }
  })
}