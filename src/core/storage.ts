export function getStorage(type: "localStorage" | "sessionStorage") {
	if (typeof window == "undefined") throw new Error("No window object found");
	return type == "localStorage" ? window.localStorage : window.sessionStorage;
}
