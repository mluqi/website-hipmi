"use client";

import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import {
  usePublic,
  LandingPageData,
  LandingPageComponentItem,
} from "@/contexts/PublicContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Image from "next/image";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

interface FormState {
  [id: string]: {
    value: string | File | null;
    type: "text" | "image";
    preview?: string | null;
  };
}

const Dashboard = () => {
  const {
    landingPageData,
    fetchLandingPageComponents,
    updateLandingPageComponent,
    loading,
    error,
  } = usePublic();
  const [formState, setFormState] = useState<FormState>({});
  const [initialLoading, setInitialLoading] = useState(true);
  const [successMessages, setSuccessMessages] = useState<{
    [sectionName: string]: string;
  }>({});
  const [errorMessages, setErrorMessages] = useState<{
    [sectionName: string]: string;
  }>({});

  useEffect(() => {
    const loadData = async () => {
      setInitialLoading(true);
      await fetchLandingPageComponents();
      setInitialLoading(false);
    };
    loadData();
  }, [fetchLandingPageComponents]);

  useEffect(() => {
    const newFormState: FormState = {};
    Object.values(landingPageData).forEach((section) => {
      Object.values(section).forEach((item: LandingPageComponentItem) => {
        let initialValue: string | File | null;
        let initialPreview: string | null = null;

        if (item.type === "text") {
          initialValue = item.value || "";
        } else {
          if (item.value) {
            initialPreview = `${urlBase}/storage/${item.value}`;
          }
        }
        newFormState[item.id] = {
          value: initialValue,
          type: item.type,
          preview: initialPreview,
        };
      });
    });
    setFormState(newFormState);
  }, [landingPageData]);

  const handleInputChange = (
    id: number,
    value: string | File | null,
    type: "text" | "image"
  ) => {
    setFormState((prev) => {
      const currentItemState = prev[id];
      let newPreview = currentItemState?.preview;

      if (type === "image") {
        if (value instanceof File) {
          newPreview = URL.createObjectURL(value);
        } else if (value === null) {
          newPreview = null;
        }
      }

      return {
        ...prev,
        [id]: {
          ...currentItemState,
          value: value,
          type: currentItemState.type,
          preview: newPreview,
        },
      };
    });
  };

  const handleSubmitSection = async (
    e: FormEvent<HTMLFormElement>,
    sectionName: string
  ) => {
    e.preventDefault();
    setSuccessMessages((prev) => ({ ...prev, [sectionName]: "" }));
    setErrorMessages((prev) => ({ ...prev, [sectionName]: "" }));

    const sectionComponents = landingPageData[sectionName];
    if (!sectionComponents) {
      setErrorMessages((prev) => ({
        ...prev,
        [sectionName]: `Section ${sectionName} tidak ditemukan.`,
      }));
      return;
    }

    let allUpdatesSuccessful = true;
    let specificFieldErrors: string[] = [];

    for (const keyName in sectionComponents) {
      const component = sectionComponents[keyName];
      const currentFieldState = formState[component.id];

      if (!currentFieldState) {
        console.warn(`No form state found for component ID ${component.id}`);
        continue;
      }

      let fieldSpecificUpdateNeeded = false;
      const payload: Partial<
        Omit<LandingPageComponentItem, "id" | "created_at" | "updated_at">
      > & { value?: string | File | null; type: "text" | "image" } = {
        type: component.type,
        section: component.section,
        key_name: component.key_name,
      };
      if (component.sort_order !== undefined) {
        payload.sort_order = component.sort_order;
      }

      if (component.type === "text") {
        if (currentFieldState.value !== (component.value || "")) {
          payload.value = currentFieldState.value as string;
          fieldSpecificUpdateNeeded = true;
        }
      } else if (component.type === "image") {
        if (currentFieldState.value instanceof File) {
          payload.value = currentFieldState.value;
          fieldSpecificUpdateNeeded = true;
        } else if (
          currentFieldState.value === null &&
          component.value !== null
        ) {
          payload.value = null;
          fieldSpecificUpdateNeeded = true;
        }
      }

      if (!fieldSpecificUpdateNeeded) {
        continue;
      }

      const result = await updateLandingPageComponent(component.id, payload);

      if (result) {
        if (component.type === "image" && payload.value !== undefined) {
          const newImageValue = result.value;
          setFormState((prev) => ({
            ...prev,
            [component.id]: {
              ...prev[component.id],
              value: newImageValue,
              preview: newImageValue
                ? `${urlBase}/storage/${newImageValue}`
                : null,
            },
          }));
        }
      } else {
        allUpdatesSuccessful = false;
        specificFieldErrors.push(component.key_name);
      }
    }

    if (allUpdatesSuccessful) {
      setSuccessMessages((prev) => ({
        ...prev,
        [sectionName]: `Section '${sectionName.replace(
          /_/g,
          " "
        )}' berhasil diperbarui!`,
      }));
      await fetchLandingPageComponents();
    } else {
      setErrorMessages((prev) => ({
        ...prev,
        [sectionName]: `Gagal memperbarui beberapa field di section '${sectionName.replace(
          /_/g,
          " "
        )}': ${specificFieldErrors.join(", ")}.`,
      }));
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Edit Konten Landing Page
      </h1>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          {error}
        </div>
      )}

      {Object.entries(landingPageData).map(([sectionName, components]) => (
        <section
          key={sectionName}
          className="mb-12 bg-white p-6 rounded-lg shadow-md"
        >
          <form onSubmit={(e) => handleSubmitSection(e, sectionName)}>
            <h2 className="text-2xl font-semibold mb-6 text-gray-700 border-b pb-3 capitalize">
              {sectionName.replace(/_/g, " ")}
            </h2>

            {successMessages[sectionName] && (
              <p className="text-green-600 mb-4">
                {successMessages[sectionName]}
              </p>
            )}
            {errorMessages[sectionName] && (
              <p className="text-red-600 mb-4">{errorMessages[sectionName]}</p>
            )}
            {(() => {
              const componentKeys = Object.keys(components);
              const renderedKeys = new Set<string>();
              const elements = [];

              for (const keyName of componentKeys) {
                if (renderedKeys.has(keyName)) continue;

                const component = components[keyName];

                if (
                  component.key_name.toLowerCase().includes("infobox") &&
                  component.key_name.endsWith("_title")
                ) {
                  const isInfobox = component.key_name
                    .toLowerCase()
                    .includes("infobox");
                  const baseKey = isInfobox
                    ? component.key_name.substring(
                        0,
                        component.key_name.lastIndexOf("_title")
                      )
                    : null;
                  const descKey = `${baseKey}_description`;
                  const descComponent = components[descKey];

                  elements.push(
                    <div
                      key={baseKey || component.id}
                      className="mb-4 md:inline-block md:mr-6 md:align-top"
                      style={{ minWidth: "240px" }}
                    >
                      {/* Render Title Input */}
                      <div className="mb-2">
                        <label
                          htmlFor={`value-${component.id}`}
                          className="block text-sm font-medium text-gray-700 mb-1 capitalize"
                        >
                          {component.key_name.replace(/_/g, " ")}
                        </label>
                        <input
                          type="text"
                          id={`value-${component.id}`}
                          value={
                            (formState[component.id]?.value as string) || ""
                          }
                          onChange={(e) =>
                            handleInputChange(
                              component.id,
                              e.target.value,
                              "text"
                            )
                          }
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-textcolor"
                        />
                      </div>
                      {/* Render Description Input if exists */}
                      {descComponent && formState[descComponent.id] && (
                        <div>
                          <label
                            htmlFor={`value-${descComponent.id}`}
                            className="block text-sm font-medium text-gray-700 mb-1 capitalize"
                          >
                            {descComponent.key_name.replace(/_/g, " ")}
                          </label>
                          <input
                            type="text"
                            id={`value-${descComponent.id}`}
                            value={
                              (formState[descComponent.id]?.value as string) ||
                              ""
                            }
                            onChange={(e) =>
                              handleInputChange(
                                descComponent.id,
                                e.target.value,
                                "text"
                              )
                            }
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-textcolor"
                          />
                        </div>
                      )}
                    </div>
                  );
                  renderedKeys.add(component.key_name);
                  if (descComponent) renderedKeys.add(descComponent.key_name);
                } else if (
                  component.section.toLowerCase() === "footer" &&
                  component.type === "text" &&
                  !component.key_name.toLowerCase().includes("_description") &&
                  !component.key_name.toLowerCase().includes("_title")
                ) {
                  elements.push(
                    <div
                      key={component.id}
                      className="mb-4 md:inline-block md:mr-6 md:align-top"
                      style={{ minWidth: "240px" }}
                    >
                      <div className="mb-2">
                        <label
                          htmlFor={`value-${component.id}`}
                          className="block text-sm font-medium text-gray-700 mb-1 capitalize"
                        >
                          {component.key_name.replace(/_/g, " ")} (
                          {component.type})
                        </label>
                        <input
                          type="text"
                          id={`value-${component.id}`}
                          value={
                            (formState[component.id]?.value as string) || ""
                          }
                          onChange={(e) =>
                            handleInputChange(
                              component.id,
                              e.target.value,
                              "text"
                            )
                          }
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-textcolor"
                        />
                      </div>
                    </div>
                  );
                  renderedKeys.add(component.key_name);
                } else if (
                  !component.key_name
                    .toLowerCase()
                    .includes("infobox_description") &&
                  (component.section.toLowerCase() !== "footer" ||
                    component.type === "image")
                ) {
                  elements.push(
                    <div key={component.id} className="mb-6">
                      {component.type === "text" && formState[component.id] && (
                        <div>
                          <label
                            htmlFor={`value-${component.id}`}
                            className="block text-sm font-medium text-gray-700 mb-1 capitalize"
                          >
                            {component.key_name.replace(/_/g, " ")} (
                            {component.type})
                          </label>
                          {typeof window === "object" && ReactQuill && (
                            <ReactQuill
                              theme="snow"
                              value={
                                (formState[component.id]?.value as string) || ""
                              }
                              onChange={(content) =>
                                handleInputChange(component.id, content, "text")
                              }
                              className="h-64 mb-12 text-textcolor"
                              style={{
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                              }}
                            />
                          )}
                        </div>
                      )}
                      {component.type === "image" && (
                        <div className="md:flex md:items-end md:space-x-4">
                          {" "}
                          {/* Flex container untuk desktop */}
                          <div className="flex-shrink-0">
                            {" "}
                            {/* Untuk preview agar tidak terlalu lebar */}
                            <label
                              htmlFor={`value-${component.id}`}
                              className="block text-sm font-medium text-gray-700 mb-1 capitalize"
                            >
                              {component.key_name.replace(/_/g, " ")} (
                              {component.type})
                            </label>
                            {formState[component.id]?.preview && (
                              <div className="mt-1 mb-2 md:mb-0">
                                {" "}
                                {/* Sesuaikan margin untuk desktop */}
                                <div className="relative w-[150px] h-[100px]">
                                  <Image
                                    src={
                                      formState[component.id]?.preview as string
                                    }
                                    alt={`Preview ${component.key_name}`}
                                    fill
                                    sizes="(max-width: 768px) 150px, 100px"
                                    className="rounded-md object-cover"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                          <input
                            type="file"
                            id={`value-${component.id}`}
                            onChange={(e) =>
                              handleInputChange(
                                component.id,
                                e.target.files ? e.target.files[0] : null,
                                "image"
                              )
                            }
                            accept="image/*"
                            className="mt-1 block w-full md:w-auto text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                          />
                        </div>
                      )}
                    </div>
                  );
                  renderedKeys.add(component.key_name);
                }
              }
              return elements;
            })()}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline disabled:bg-gray-400 mt-8"
            >
              {loading ? (
                <LoadingSpinner />
              ) : (
                `Simpan Perubahan Section ${sectionName.replace(/_/g, " ")}`
              )}
            </button>
          </form>
        </section>
      ))}
    </div>
  );
};

export default Dashboard;
