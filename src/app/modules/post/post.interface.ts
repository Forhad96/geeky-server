import { Document, Types } from 'mongoose';

// Interface for the Post document
export interface IPost extends Document {
  title: string;
  content: string;
  images:string[];
  tags?: string[];
  category: string;
  author: Types.ObjectId;
  comments: number;
  upVotes: number;
  downVotes: number;
  isPremium: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  pdfVersion?: string;
}
