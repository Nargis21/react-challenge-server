/* eslint-disable @typescript-eslint/no-explicit-any */
import { Secret } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { IUser, IUserChallenge } from './user.interface';
import { User } from './user.model';
import config from '../../../config';
import mongoose from 'mongoose';

const userAuth = async (user: IUser) => {
  let userInfo;

  const isUserExist = await User.isUserExist(user.email);
  if (!isUserExist) {
    const createdUser = await User.create(user);
    if (!createdUser) {
      throw new ApiError(400, 'Failed to create user!');
    }
    const { _id, email, role } = createdUser;
    userInfo = { _id, email, role };
  } else {
    const { _id, email, role } = isUserExist;
    userInfo = { _id, email, role };
  }

  //create access token
  const accessToken = jwtHelpers.createToken(
    userInfo,
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return { accessToken };
};

const checkAdmin = async (email: string) => {
  const isUserExist = await User.isUserExist(email);
  const isAdmin = isUserExist?.role === 'admin';
  return { admin: isAdmin };
};

const getUserChallenges = async (userId: string) => {
  const result = await User.findById(userId)
  return result
}

const getUserChallengeById = async (userId: string, challengeId: string) => {
  const result = await User.findById(userId)

  const challenge = result?.challenges?.find(challenge => {
    if(challenge?.challengeId === challengeId){
      return challenge
    }
  })

  return challenge

}

const deleteChallengeById = async (userId: string, userChallengeId: string) => {
  const result = await User.updateOne(
    {_id: userId},
    {
      $pull: {
        "challenges": {"_id": userChallengeId}
      }
    },
    {safe: true}
    )

  return result

}

const addUserChallenge = async (challengeData: IUserChallenge, userId: string) => {
  // find the user
  const result = await User.findById(userId)

  // check if challenge exist
  const challengeId = challengeData?.challengeId

  const challenge = result?.challenges?.find(challenge => {
    if(challenge?.challengeId === challengeId){
      return challenge
    }
  })
  if(challenge){
    // update the files
    const updateChallenge = await User.findByIdAndUpdate(
      {_id: userId},
      {
        $set: {
          "challenges.$[item].files": challengeData?.files
        }
      },
      {
        arrayFilters: [{"item.challengeId": challengeId}]
      }
    )
    if(!updateChallenge){
      throw new ApiError(400, 'Failed to create challenge!');
    }

    return updateChallenge
  }else{
    // add new challenge into challenges
    const addChallenge = await User.findByIdAndUpdate(
      {_id: userId},
      {
        $addToSet: {
          "challenges": challengeData
        }
      }
    )
    if(!addChallenge){
      throw new ApiError(400, 'Failed to create challenge!');
    }

    return addChallenge
  }

}

export const UserService = {
  userAuth,
  checkAdmin,
  addUserChallenge,
  getUserChallenges,
  getUserChallengeById,
  deleteChallengeById
};
