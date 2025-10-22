import mongoose, { Schema, Document, Model } from 'mongoose'

export type UserRole = 'Student' | 'Parent' | 'Educator'

export interface UserPreferences {
  fontSize?: string
  backgroundColor?: string
  contrast?: string
  spacing?: string
  preferredMode?: 'text' | 'visual' | 'audio'
  speechSpeed?: number
  animationEnabled?: boolean
}

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: UserRole
  adhdScore?: number
  preferences: UserPreferences
  createdAt: Date
  updatedAt: Date
}

const PreferencesSchema = new Schema<UserPreferences>({
  fontSize: { type: String, default: 'medium' },
  backgroundColor: { type: String, default: '#f8fafc' },
  contrast: { type: String, default: 'normal' },
  spacing: { type: String, default: 'normal' },
  preferredMode: { type: String, enum: ['text', 'visual', 'audio'], default: 'text' },
  speechSpeed: { type: Number, default: 1.0 },
  animationEnabled: { type: Boolean, default: true },
}, { _id: false })

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Student', 'Parent', 'Educator'], required: true },
  adhdScore: { type: Number, min: 0, max: 100 },
  preferences: { type: PreferencesSchema, default: {} },
}, { timestamps: true })

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

