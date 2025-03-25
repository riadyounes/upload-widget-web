import axios from "axios";

interface uploadFileToStorageParams {
	file: File;
	onProgress: (sizeInBytes: number) => void;
}

interface uploadFileToStorageOpts {
	signal?: AbortSignal;
}

export async function uploadFileToStorage(
	{ file, onProgress }: uploadFileToStorageParams,
	opts?: uploadFileToStorageOpts,
) {
	const data = new FormData();

	data.append("file", file);

	const response = await axios.post<{ url: string }>(
		"http://localhost:3333/uploads",
		data,
		{
			headers: {
				"Content-Type": "multipart/form-data",
			},
			signal: opts?.signal,
			onUploadProgress: (progressEvent) => {
				onProgress?.(progressEvent.loaded);
			},
		},
	);

	return response.data.url;
}
