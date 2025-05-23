import { FileData, FileStorage } from "../types/storage";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import config from "config";

export class S3Storage implements FileStorage {
    private client: S3Client;

    constructor() {
        this.client = new S3Client({
            region: config.get("s3.region"),
            credentials: {
                accessKeyId: config.get("s3.accessKeyId"),
                secretAccessKey: config.get("s3.secretAccessKey"),
            },
        });
    }

    async upload(data: FileData): Promise<void> {
        const objectParams = {
            Bucket: config.get("s3.bucket"),
            Key: data.filename,
            Body: data.fileData,
        };

        // todo: add proper file datatype
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await this.client.send(new PutObjectCommand(objectParams));
    }
    delete(): void {
        throw new Error("Method not implemented.");
    }
    getObjectUri(): string {
        throw new Error("Method not implemented.");
    }
}
