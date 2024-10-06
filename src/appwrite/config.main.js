import config from "../config/config.js";
import { Client, ID, Databases, Storage, Query } from 'appwrite';

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredimage, status, userId }) {
        try {
            return await this.databases.createDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug, { title, content, featuredimage, status, userId })
        } catch (error) {
            console.log("Appwrite Service :: createPost :: error", error);
        }
    }

    async updatePost(slug, { title, content, featuredimage, status}) {
        try {
            return await this.databases.updateDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug, { title, content, featuredimage, status })
        } catch (error) {
            console.log("Appwrite Service :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug);
            return true;
        } catch (error) {
            console.log("Appwrite Service :: deletePost :: error", error);
        }
    }

    async getPost(slug){ 
        try {
            return await this.databases.getDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug);
        } catch (error) {
            console.log("Appwrite Service :: getPost :: error", error); 
        }
    }

    async getAllPost(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(config.appwriteDatabaseId, config.appwriteCollectionId, queries);
        } catch (error) {
            console.log("Appwrite Service :: getAllPosts :: error", error);
        }
    }
}

const service = new Service();

export default service;