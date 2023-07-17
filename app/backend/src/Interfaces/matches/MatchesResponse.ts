import { IMatches } from './IMatches';

type successCode = 201;
type invalidCode = 404 | 422;
type invalidText = { message: 'It is not possible to create a match with two equal teams' } |
{ message: 'There is no team with such id!' };

type success = {
  code: successCode,
  message: IMatches
};

type invalid = {
  code: invalidCode,
  message: invalidText
};

export type MatchesResponse = success | invalid;
