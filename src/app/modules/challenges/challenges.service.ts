import ApiError from "../../../errors/ApiError";
import { IChallenge } from './challenges.interface'
import { Challenge } from './challenges.model'
import { User } from "../user/user.model";
import httpStatus from "http-status";
import { IUserChallenge } from "../user/user.interface";

const getAllChallenges = async (): Promise<IChallenge[]> => {
  const result = await Challenge.find().select('-files');
  return result
}

const createChallenge = async (challenge: IChallenge): Promise<IChallenge | null> => {
  const createdChallenge = Challenge.create(challenge);
  if(!createdChallenge){
    throw new ApiError(400, 'Failed to create challenge!');
  }
  return createdChallenge;
} 

const getChallengeById = async (id: string, userId: string): Promise<IChallenge| IUserChallenge | undefined | null> => {
  if(!(userId === undefined || userId === null)){
    const result = await User.findById(userId)

    const challenge = result?.challenges?.find(challenge => {
      if(challenge?.challengeId === id){
        return challenge
      }
    })

    if(challenge){
      return challenge
    }else{
      const result = await Challenge.findById(id);
      return result; 
    }

    
  }else{
    const result = await Challenge.findById(id);
    return result;
  }

}

const deleteChallenge = async (id: string): Promise<IChallenge | null> => {
  const challenge = await Challenge.findById(id);
  if(!challenge){
    throw new ApiError(httpStatus.NOT_FOUND, 'Challenge does not exist');
  }
  const result = await Challenge.findByIdAndDelete(id);
  return result;
}

export const ChallengeService = {
  getAllChallenges,
  createChallenge,
  getChallengeById,
  deleteChallenge
}
