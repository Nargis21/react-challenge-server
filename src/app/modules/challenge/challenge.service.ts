import ApiError from '../../../errors/ApiError';
import { IChallenge } from './challenge.interface';
import { Challenge } from './challenge.model';
import httpStatus from 'http-status';

const createChallenge = async (
  challenge: IChallenge
): Promise<IChallenge | null> => {
  const createdChallenge = Challenge.create(challenge);
  if (!createdChallenge) {
    throw new ApiError(400, 'Failed to create challenge!');
  }
  return createdChallenge;
};

const getAllChallenges = async (): Promise<IChallenge[]> => {
  const result = await Challenge.find();
  return result;
};

const getTopTen = async (): Promise<IChallenge[]> => {
  const result = await Challenge.find().sort({ createdAt: -1 }).limit(10);
  return result;
};

const getSingleChallenge = async (id: string): Promise<IChallenge | null> => {
  const result = await Challenge.findById(id);
  return result;
};

const updateChallenge = async (
  userEmail: string,
  challengeId: string,
  payload: Partial<IChallenge>
): Promise<IChallenge | null> => {
  const challenge = await Challenge.findById(challengeId);
  if (!challenge) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Challenge does not exist');
  }

  const result = await Challenge.findOneAndUpdate(
    { _id: challengeId },
    payload,
    {
      new: true,
    }
  );
  return result;
};

const deleteChallenge = async (
  userEmail: string,
  challengeId: string
): Promise<IChallenge | null> => {
  const challenge = await Challenge.findById(challengeId);
  if (!challenge) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Challenge does not exist');
  }

  const result = await Challenge.findByIdAndDelete(challengeId);
  return result;
};

export const ChallengeService = {
  createChallenge,
  getAllChallenges,
  getTopTen,
  getSingleChallenge,
  updateChallenge,
  deleteChallenge,
};
